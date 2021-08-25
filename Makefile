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
BASE_IMAGE_TAG := 68877f5853c6f3df2664b8b23f8ec8367902047a

BUILD_IMAGE_TAG := 25c031edd46040a8745334570940a0f0b2154c5c

GIT_SSH_COMMAND :=
DOCKER_RUN_OPTS = -e GIT_SSH_COMMAND='$(GIT_SSH_COMMAND)' -e NG_CLI_ANALYTICS=ci -e NPM_TOKEN='$(GITHUB_TOKEN)' -e SENTRY_AUTH_TOKEN='$(SENTRY_AUTH_TOKEN)'

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
	npm run ci:check
	$(SENTRY_AUTH_TOKEN) npm run build

clean:
	rm -rf dist

test:
	docker run --name $(SERVICE_NAME)_$(shell python -c 'from random import randint; print(randint(100000, 999999));')_test --rm -v $(WORKDIR):/usr/src/app:z zenika/alpine-chrome:with-node npm run ci:test
