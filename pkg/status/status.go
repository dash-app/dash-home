package status

type Error struct {
	Error error  `json:"error"`
	Code  string `json:"code"`
}
