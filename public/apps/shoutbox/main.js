import plugins from './plugins';
import Application from './application/application';
import HeaderService from './features/header/service';
import IndexRouter from './features/index/router';


const app = new Application();

HeaderService.setup({
  container: app.layout.getRegion('header')
});

app.index = new IndexRouter({
  container: app.layout.getRegion('content')
});

window.App = app;
app.start()
