clean:
	@rm -rfv $(PWD)/docs

docs:
	@swag init --parseVendor --parseDependency -o ./api -g ./pkg/server/http.go
	@npx redoc-cli bundle ./api/swagger.yaml -o ./api/index.html

viewdocs: docs
	@npx redoc-cli serve ./api/swagger.yaml --port 28080 --watch
