docker run -v `pwd`:/src -w /src ghcr.io/webassembly/wasi-sdk:main cmake -B ./build-wasi .
docker run -v `pwd`:/src -w /src ghcr.io/webassembly/wasi-sdk:main cmake --build ./build-wasi
cp ./build-wasi/hello ./hello.wasm