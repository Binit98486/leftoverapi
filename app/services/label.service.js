class LabelService {
  validateLabelData = (data, is_edit = false) => {
    console.log(data);

    let err = {};
    if (!data.title) {
      err["title"] = "Title is required";
    } else {
      delete err["title"];
    }
    if (!is_edit) {
      if (!data.image) {
        err["image"] = "Image is required";
      } else {
        delete err["image"];
      }
    }

    if (!data.type) {
      err["type"] = "Type is required";
    } else {
      if (data.type != "banner" && data.type != "brand") {
        err["type"] = "Either banner or brand is only allowed as type";
      } else {
        delete err["type"];
      }
    }
    if (!data.status) {
      err["status"] = "Status is required";
    } else {
      if (data.status != "active" && data.status != "inactive") {
        err["status"] = "Active or Inactive  can only be the value for status";
      } else {
        delete err["status"];
      }
    }
    if (Object.keys(err).length > 0) {
      return err;
    } else {
      return null;
    }
  };
  getSlug = (str) => {
    const title = str?.toLowerCase();
    return title.replace(/\s+/g, "-");
  };
}

module.exports = LabelService;
