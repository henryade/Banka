import jasmine from "jasmine";

const Jasmine = new jasmine();
Jasmine.loadConfigFile("spec/support/jasmine.json");
Jasmine.execute();
