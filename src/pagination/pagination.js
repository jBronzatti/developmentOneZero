module.exports = {
    paginate(found, page, limit) {
        const startAt = (page - 1) * limit;
        const endAt = page * limit;
        return found.slice(startAt, endAt);
    }
};