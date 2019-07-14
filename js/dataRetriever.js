class DataRetriever{
	static get BASE_URL(){
		return 'http://jsonplaceholder.typicode.com';
	}
	static get INPUT_ELM(){
		return document.querySelector('.user-input');
	}
	static get TRIGGER_ELM(){
		return document.querySelector('.user-button');
	}
	static get USER_CNT(){
		return document.querySelector('.user-name');
	}
	static get USER_POST_CNT(){
		return document.querySelector('.user-posts');
	}

	constructor(){
		this.init();
	}

	/**
	*Function to ajaxCall
	*/
	ajaxCall(url){
		fetch(url)
		.then(data => data.json(data))
		.then(data => this.dataGen.next(data))
		.catch(err => `Problems retreving information ${err}`);
	}

	/**
	*Print info under elements
	*/
	renderTemplate(user){
		const { name, username } = user;
		const userHeader = `Nombre: <strong>${name}</strong> Alias: <strong>${username}</strong>`;
		DataRetriever.USER_CNT.innerHTML = userHeader;
	}

	/**
	*Function to call ajax
	*User and Posts
	*/
	*getInfo(userId){
		const user = yield this.ajaxCall(`${DataRetriever.BASE_URL}/users/${userId}`);
		this.renderTemplate(user);
	}

	/**
	*Get user ID and generator initializer
	*/
	getUser(){
		const userId = DataRetriever.INPUT_ELM.value;
		this.dataGen = this.getInfo(userId);
		this.dataGen.next();
	}

	init() {
		DataRetriever.TRIGGER_ELM.addEventListener('click', this.getUser.bind(this));
	}

}

new DataRetriever;
