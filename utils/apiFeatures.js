class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort.split(",").join(" "));
    } else {
      // this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      this.query = this.query.select(
        this.queryString.fields.split(",").join(" "),
      );
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const pageNo = +this.queryString.page || 1;
    const limitTemp = +this.queryString.limit || 100;
    const skip = (pageNo - 1) * limitTemp;

    this.query = this.query.limit(limitTemp).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
