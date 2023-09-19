package stream

func (h *Hub) PublishController(c interface{}) {
	h.publish <- &Publish{
		Target: "test",
		Entry: &StreamEntry{
			Type:       "CONTROLLER",
			Controller: c,
		},
	}
}

func (h *Hub) PublishAgent(a interface{}) {
    h.publish <- &Publish{
        Target: "test",
        Entry: &StreamEntry{
            Type: "AGENT",
            Agent: a,
        },
    }
}
