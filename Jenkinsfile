#!groovy

build('dashboard', 'docker-host') {
  checkoutRepo()
  loadBuildUtils()

  def pipeDefault
  def withWsCache
  runStage('load pipeline') {
    env.JENKINS_LIB = "build_utils/jenkins_lib"
    pipeDefault = load("${env.JENKINS_LIB}/pipeDefault.groovy")
    withWsCache = load("${env.JENKINS_LIB}/withWsCache.groovy")
  }

  def pipeline = {
    runStage('init') {
      withGithubSshCredentials {
        sh 'make submodules'
        withGithubToken {
          sh 'make wc_init'
        }
      }
    }
    if (env.BRANCH_NAME == 'master') {
      runStage('build') {
        withCredentials([string(credentialsId: 'SENTRY_AUTH_TOKEN', variable: 'SENTRY_AUTH_TOKEN')]) {
          sh 'make wc_build'
        }
      }
    } else {
      runStage('build') {
        sh 'make build_pr'
      }
    }
    runStage('test fe (karma.js)') {
      sh 'make test'
    }
    runStage('build image') {
      sh 'make build_image'
    }
    runFESecurityTools()
    try {
      if (env.BRANCH_NAME == 'master') {
        runStage('push image') {
          sh 'make push_image'
        }
      }
    } finally {
      runStage('rm local image') {
        sh 'make rm_local_image'
      }
    }
  }
  pipeDefault(pipeline)
}
