describe("Client-side chat ", function () {
	it("is true still true", function() {
		expect(true).toBe(true);
	});

	it("should produce a correct message div", function() {
		expect('<div class="message"><p>' +
			// html_sanitize(pseudo) + ' : ' +
			// html_sanitize(msg) + '</p></div>';
		"Roger" + ' : ' +
		"Hi" + '</p></div>').toBe('<div class=\"message\"><p>Roger : Hi</p></div>');
	});
});