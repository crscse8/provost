#!/bin/bash -e
cd "$(dirname ${BASH_SOURCE[0]})"

. VERSIONS

case $( uname -m ) in
  aarch64) ARCH=arm64;;
  armhl) ARCH=arm7;;
  x86_64) ARCH=amd64;;
esac
PLATFORM="$(uname -s | tr 'A-Z' 'a-z')"

if [ ! -d "geth-alltools-${PLATFORM}-${ARCH}-${GETH_VERSION}" ]; then
  if [ ! -f "geth-alltools-${PLATFORM}-${ARCH}-${GETH_VERSION}.tar.gz" ]; then
    wget -O geth-alltools-${PLATFORM}-${ARCH}-${GETH_VERSION}.tar.gz https://gethstore.blob.core.windows.net/builds/geth-alltools-${PLATFORM}-${ARCH}-${GETH_VERSION}.tar.gz
  fi
  tar xzf geth-alltools-${PLATFORM}-${ARCH}-${GETH_VERSION}.tar.gz
  rm -f geth-alltools-${PLATFORM}-${ARCH}-${GETH_VERSION}.tar.gz
fi

if ! [ -f "gotty_${GOTTY_VERSION}_${PLATFORM}_${ARCH}/gotty" ]; then
  mkdir -p gotty_${GOTTY_VERSION}_${PLATFORM}_${ARCH}
  wget -O gotty_${GOTTY_VERSION}_${PLATFORM}_${ARCH}.tar.gz https://github.com/yudai/gotty/releases/download/v${GOTTY_VERSION}/gotty_${GOTTY_VERSION}_${PLATFORM}_${ARCH}.tar.gz
  tar xvzf gotty_${GOTTY_VERSION}_${PLATFORM}_${ARCH}.tar.gz -C gotty_${GOTTY_VERSION}_${PLATFORM}_${ARCH}
  rm -f gotty_${GOTTY_VERSION}_${PLATFORM}_${ARCH}.tar.gz
fi
