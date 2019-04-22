SUBMODULES = build_utils
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

BUILD_IMAGE_TAG := f3732d29a5e622aabf80542b5138b3631a726adb

GIT_SSH_COMMAND :=
DOCKER_RUN_OPTS = -e GIT_SSH_COMMAND='$(GIT_SSH_COMMAND)'

CALL_W_CONTAINER := init check lint test build clean submodules

.PHONY: $(CALL_W_CONTAINER)

all: build

-include $(UTILS_PATH)/make_lib/utils_image.mk
-include $(UTILS_PATH)/make_lib/utils_container.mk

$(SUBTARGETS): %/.git: %
	git submodule update --init $<
	touch $@

submodules: $(SUBTARGETS)

init: swagger-compile
	npm ci

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

swagger-clean:
	rm -rf dist src/app/api/swag-v3/swagger-codegen

swagger-compile: swagger-clean
	swagger-codegen generate -l typescript-fetch -i schemes/swag/v3/swagger.yaml -o src/app/api/capi/swagger-codegen
