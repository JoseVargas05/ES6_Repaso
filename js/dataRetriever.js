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
	renderTemplate(user, posts){
		const { name, username } = user;
		const userHeader = `Nombre: <strong>${name}</strong> Alias: <strong>${username}</strong>`;
		const postsTitles = posts.map(post => `<li>${post.title}</li>`).join('');
		DataRetriever.USER_CNT.innerHTML = userHeader;
		DataRetriever.USER_POST_CNT.innerHTML = postsTitles;
	}

	/**
	*Function to call ajax
	*User and Posts
	*/
	*getInfo(userId){
		const user = yield this.ajaxCall(`${DataRetriever.BASE_URL}/users/${userId}`);
		const posts = yield this.ajaxCall(`${DataRetriever.BASE_URL}/posts?userId=${userId}`);
		this.renderTemplate(user, posts);
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
