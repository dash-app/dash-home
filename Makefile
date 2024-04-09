clean_docs:
	@rm -rfv $(PWD)/docs

docs: clean_docs
	@swag init --parseVendor --parseDependency -o ./docs -g ./pkg/server/http.go
	@npx redoc-cli bundle ./docs/swagger.yaml -o ./docs/index.html

viewdocs: docs
	@npx redoc-cli serve ./docs/swagger.yaml --port 28080 --watch

#
# Frontend
#
clean_frontend:
	@rm -rfv ./frontend/dash-home/build
	@rm -rfv ./public

frontend: clean_frontend
	@cd ./frontend/dash-home && \
	NODE_ENV=production yarn install && \
	NODE_ENV=production yarn run build && \
	cp -rv build ../../public

#
# Backend
#
statik:
	@echo ":: Generate bindata from statik..."
	@go install -v github.com/rakyll/statik
	@statik -f -src ./public -p server -dest ./pkg/

clean: clean_frontend
	@rm -rfv ./build
	@rm -rfv ./pkg/server/statik.go

build: build_linux_amd64 build_linux_armv6 build_darwin_amd64
build_linux_amd64: statik
	@mkdir -p ./build/linux_amd64
	@GOOS=linux GOARCH=amd64 \
		go build -v -o build/linux_amd64/dash-home \
		./cmd/dash-home/main.go

build_linux_armv6: statik
	@mkdir -p ./build/linux_armv6
	@GOOS=linux GOARCH=arm GOARM=6 \
		go build -v -o build/linux_armv6/dash-home \
		./cmd/dash-home/main.go

build_darwin_amd64: statik
	@mkdir -p ./build/darwin_amd64
	@GOOS=darwin GOARCH=amd64 \
		go build -v -o build/darwin_amd64/dash-home \
		./cmd/dash-home/main.go
