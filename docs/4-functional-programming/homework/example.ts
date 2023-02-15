import {main, SortBy} from "./src/main";

main(SortBy.distance)
  .then(console.log)
  .then(() => console.log('\n///\n'))
  .then(() => main(SortBy.reward))
  .then(console.log)
