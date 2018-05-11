#!/bin/bash -xe
cd "$(dirname ${BASH_SOURCE[0]})"

# Grab the current binary versions
. pull.sh

# Spawn the gotty web listener, have it attach to tmux when a browser connects.
${PWD}/gotty_${GOTTY_VERSION}_${PLATFORM}_${ARCH}/gotty --permit-write --address 127.0.0.1 --port 8001 tmux new -A -s geth &

# Spawn the tmux anchor session running the actual geth blockchain agent
tmux new -A -s geth ${PWD}/geth-alltools-${PLATFORM}-${ARCH}-${GETH_VERSION}/geth --light --rpc --shh --rinkeby

# The tmux has exited, let's try and kill the gotty if it is still running as well
# The %1 here is a bash job reference, not pid 1 (that would be init, we wouldn't want that)
kill %1

# Wait for both spawned children to exit before exiting this bash shell
wait
