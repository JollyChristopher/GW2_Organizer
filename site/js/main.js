class MainComponent {
    count = 0;
    itemData = '';

    constructor() {
        this.loadData();
    }

    clicked() {
        this.count++;
    }

    loadData() {
        m.request({
            method: 'GET',
            url: 'https://api.guildwars2.com/v2/itemstats?ids=137',
        }).then((data) => {
            this.itemData = data;
        });
    }

    view() {
        return m('main', [
            m('h1', { class: 'title' }, 'My First app'),
            m('button', { onclick: () => { this.clicked() } }, this.count + ' clicks'),
            m('p', {}, JSON.stringify(this.itemData)),
        ]);
    }
}

m.route(document.body, '/', {
    '/': new MainComponent(),
});