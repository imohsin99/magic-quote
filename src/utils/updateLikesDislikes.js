const updateLikesDislikes = (obj, userId, type) => {
    const isLiked = obj.likes.includes(userId);
    const isDisliked = obj.dislikes.includes(userId);

    if (type === 'like') {
        if (isLiked) {
            obj.likes = obj.likes.filter((like) => like !== userId);
        } else {
            obj.likes.push(userId);
        }
    } else if (type === 'dislike') {
        if (isDisliked) {
            obj.dislikes = obj.dislikes.filter((dislike) => dislike !== userId);
        } else {
            obj.dislikes.push(userId);
        }
    }

    if (isDisliked && type === 'like') {
        obj.dislikes = obj.dislikes.filter((dislike) => dislike !== userId);
    }

    if (isLiked && type === 'dislike') {
        obj.likes = obj.likes.filter((like) => like !== userId);
    }
};

export default updateLikesDislikes;
