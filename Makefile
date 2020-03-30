UTILS_PATH := build_utils
SWAGGER_SCHEMES_PATH := schemes/swag/v3 schemes/claim-management/v0 schemes/questionary/v0 schemes/questionary-aggr-proxy/v0 schemes/swag-analytics/v1 schemes/dark-api/v0 schemes/messages/v0
SUBMODULES = $(UTILS_PATH) $(SWAGGER_SCHEMES_PATH)

SUBTARGETS = $(patsubst %,%/.git,$(SUBMODULES))

UTILS_PATH := build_utils
TEMPLATES_PATH := .

# Name of the service
SERVICE_NAME := dashboard
# Service image default tag
SERVICE_IMAGE_TAG ?= $(shell git rev-parse HEAD)
# The tag for service image to be pushed with
SERVICE_IMAGE_PUSH_TAG ?= $(SERVICE_IMAGE_TAG)

REGISTRY ?= dr2.rbkmoney.com

# Base image for the service
BASE_IMAGE_NAME := service-fe
BASE_IMAGE_TAG := 2b4570bc1d9631c10aaed2132eb87eb9003f3471

BUILD_IMAGE_TAG := 137ba2551041c98498c78e21246902ef9045dae6

GIT_SSH_COMMAND :=
DOCKER_RUN_OPTS = -e GIT_SSH_COMMAND='$(GIT_SSH_COMMAND)'

CALL_W_CONTAINER := init test build clean submodules

.PHONY: $(CALL_W_CONTAINER)

all: build

-include $(UTILS_PATH)/make_lib/utils_image.mk
-include $(UTILS_PATH)/make_lib/utils_container.mk

$(SUBTARGETS): %/.git: %
	git submodule update --init $<
	touch $@

submodules: $(SUBTARGETS)

init:
	NG_CLI_ANALYTICS=false npm ci
	npm run codegen

build:
	npx run-p --aggregate-output check lint build

clean:
	rm -rf dist

test:
	npm run test
