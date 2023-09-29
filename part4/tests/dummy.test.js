const listHelper = require('../utils/list_helper')


test('dummy returns one', () => {
    blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

