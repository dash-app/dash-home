clean:
	@rm -rfv $(PWD)/docs

docs:
	@swag init --parseVendor --parseDependency -o ./docs -g ./pkg/server/http.go
	@npx redoc-cli bundle ./docs/swagger.yaml -o ./docs/index.html

viewdocs: docs
	@npx redoc-cli serve ./docs/swagger.yaml --port 28080 --watch
