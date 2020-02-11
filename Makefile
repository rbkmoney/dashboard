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
BASE_IMAGE_TAG := 60442c362d01a39ce3e526833c019d0e70c07ef3

BUILD_IMAGE_TAG := e7eb72b7721443d88a948546da815528a96c6de9

GIT_SSH_COMMAND :=
DOCKER_RUN_OPTS = -e GIT_SSH_COMMAND='$(GIT_SSH_COMMAND)'

CALL_W_CONTAINER := init check lint test build clean submodules compile

.PHONY: $(CALL_W_CONTAINER)

all: build

-include $(UTILS_PATH)/make_lib/utils_image.mk
-include $(UTILS_PATH)/make_lib/utils_container.mk

$(SUBTARGETS): %/.git: %
	git submodule update --init $<
	touch $@

submodules: $(SUBTARGETS)

init: npm-init compile

npm-init:
	NG_CLI_ANALYTICS=false npm ci

build: check lint
	npm run build

clean:
	rm -rf dist

check:
	npm run check

lint:
	npm run lint

test:
	npm run test

swagger:
	npm run codegen

compile: swagger
