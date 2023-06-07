// using in jest moduleNameMapper for css modules
// https://github.com/keyz/identity-obj-proxy
export default new Proxy({}, {
	get: function getter(_, key) {
		return key
	},
})
