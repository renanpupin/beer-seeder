const find = ( Model ) => ( query, sort = {} ) => Model.find({}).or( query ).sort( sort ).exec();

const findOne = ( Model ) => ( query, populate = '' ) => Model.findOne( query ).populate( populate ).exec();

const count = ( Model ) => ( query ) => Model.count( query ).exec();

const save = ( Model ) => Model.save();

// https://medium.com/@osuissa/node-js-criando-um-controller-dinamicamente-7939f64b2578
// https://medium.com/@osuissa/javascript-encapsulando-o-try-catch-do-async-await-fabb73392189
// https://medium.com/@osuissa/mongoose-atomic-design-parte-1-1a0f89336585
// https://medium.com/@osuissa/node-js-express-criando-modulos-automagicamente-fe41401d0292
// https://medium.com/@osuissa/node-js-express-refatorando-suas-rotas-9e322273feb


module.exports = {
	find: find,
	findOne: findOne,
	save: save,
}