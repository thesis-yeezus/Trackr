var JobOpening = require('../db').JobOpening;
var User = require('../db').User;

var jobOpeningModel = {};

jobOpeningModel.createRow = function(job) {
  console.log("this is job", job)
  return JobOpening.create(job)
    .then(function(result) {
      return result
    })
    .catch(function(err) {
     console.err(err)
      // console.log(err)
    })
}
