var Post;
Post.get = function () {
    $.ajax({
        url: "/api/v1/post", success: function (result) {
            return result
        }
    });
};

Post.render = function (data, container) {

};

$( document ).ready(function() {
    Post.render(
        Post.get(),
        '#grid'
    )
});