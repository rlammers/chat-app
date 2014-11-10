describe("Client-side chat ", function () {
	it("is true still true", function() {
		expect(true).toBe(true);
	});

	it("should produce a correct message div", function() {
		expect(messageDiv("Hi", "Roger")).toBe('<div class=\"message\"><p>Roger : Hi</p></div>');
	});
});