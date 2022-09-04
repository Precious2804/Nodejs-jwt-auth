
const all_posts = (req, res) => {
    res.status(200).json({
        status: true,
        message: 'All Posts',
        data: { title: 'Post title', body: "The contents if the post" }
    })
}

module.exports = {
    all_posts
}