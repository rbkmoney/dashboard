UTILS_PATH := build_utils
SWAGGER_SCHEMES_PATH := schemes/swag/v2 schemes/claim-management/v0 schemes/questionary/v0 schemes/questionary-aggr-proxy/v0 schemes/swag-analytics/v1 schemes/dark-api/v0 schemes/messages/v0 schemes/url-shortener/v0 schemes/swag-wallets/v0 schemes/organizations/v0 schemes/sender/v0
SUBMODULES = $(UTILS_PATH) $(SWAGGER_SCHEMES_PATH)

SUBTARGETS = $(patsubst %,%/.git,$(SUBMODULES))

UTILS_PATH := build_utils
TEMPLATES_PATH := .

WORKDIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Name of the service
SERVICE_NAME := dashboard
# Service image default tag
SERVICE_IMAGE_TAG ?= $(shell git rev-parse HEAD)
# The tag for service image to be pushed with
SERVICE_IMAGE_PUSH_TAG ?= $(SERVICE_IMAGE_TAG)

REGISTRY ?= dr2.rbkmoney.com

# Base image for the service
BASE_IMAGE_NAME := service-fe
BASE_IMAGE_TAG := 647d66a59ba89ea42b326ca5156f5d1e1395febc

BUILD_IMAGE_TAG := 917afcdd0c0a07bf4155d597bbba72e962e1a34a

GIT_SSH_COMMAND :=
DOCKER_RUN_OPTS = -e GIT_SSH_COMMAND='$(GIT_SSH_COMMAND)' -e NG_CLI_ANALYTICS=ci -e NPM_TOKEN='$(GITHUB_TOKEN)'

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
	echo -e "//npm.pkg.github.com/:_authToken=$(NPM_TOKEN)" >> .npmrc
	npm ci
	npm run codegen

build:
	npx run-p --aggregate-output --print-label check lint-errors
	npm run build

clean:
	rm -rf dist

test:
	docker run --name $(SERVICE_NAME)_$(($(date +%s%N)/1000000))_test --rm -v $(WORKDIR):/usr/src/app:z zenika/alpine-chrome:with-node npm run test-ci
