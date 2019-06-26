UTILS_PATH := build_utils
SWAGGER_SCHEME_PATH := \
	schemes/swag/v3
SUBMODULES = $(UTILS_PATH) $(SWAGGER_SCHEME_PATH)

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

SWAGGER_SWAG_V3_DIR = 'src/app/api/capi/swagger-codegen'
SWAGGER_CLI = 'swagger-codegen-cli.jar'
swagger-init:
	wget http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.4.4/swagger-codegen-cli-2.4.4.jar -O $(SWAGGER_CLI)
swagger-clean:
	rm -rf $(SWAGGER_SWAG_V3_DIR)
swagger-compile:
	java -jar $(SWAGGER_CLI) generate -l typescript-angular --additional-properties ngVersion=7 -i schemes/swag/v3/swagger.yaml -o $(SWAGGER_SWAG_V3_DIR)
swagger: swagger-init swagger-clean swagger-compile

KONTUR_FOCUS_MODEL_DIR = src/app/kontur-focus/gen-model
KONTUR_FOCUS_API = req req/mon monList analytics contacts egrDetails egrDetails/mon licences buh fssp govPurchasesOfParticipant govPurchasesOfCustomer stat
kontur-focus-clean:
	rm -rf $(KONTUR_FOCUS_MODEL_DIR)
kontur-focus-compile:
	$(foreach req,$(KONTUR_FOCUS_API),\
	mkdir -p $(shell dirname $(KONTUR_FOCUS_MODEL_DIR)/$(req).ts);\
	npm run quicktype -- https://focus-api.kontur.ru/api3/$(req)/schema -o $(KONTUR_FOCUS_MODEL_DIR)/$(req).ts;\
	)
kontur-focus: kontur-focus-clean kontur-focus-compile

compile: swagger kontur-focus
