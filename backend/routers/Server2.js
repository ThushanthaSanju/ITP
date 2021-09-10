html {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  margin: 0;
  height: 100vh;
  font-size: 1.6rem;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  height: 100%;
}
/* Form */
.form {
  max-width: 60rem;
  margin: 0 auto;
}
.form > div {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}
.form label {
  margin: 1rem 0;
}

/* layout */
.grid-container {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 1fr 5rem;
  height: 100%;
}

header {
  grid-area: header;
  background-color: DeepSkyBlue;
}
main {
  grid-area: main;
  padding: 1rem;
}

footer {
  grid-area: footer;
  background-color: DeepSkyBlue;
}

/*Header*/

a.brand {
  color: whitesmoke;
  font-size: 3rem;
  font-weight: bold;
}

.badge {
  background-color: #f02020;
  color: #ffffff;
  border-radius: 50%;
  padding: 0.2rem 0.7rem;
  font-size: 1.4rem;
  margin-left: 0.2rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.row.top {
  align-items: flex-start;
}

.col-1 {
  flex: 1 1 25rem;
}

.col-2 {
  flex: 2 1 50rem;
}

.min-30 {
  min-width: 30rem;
}

/* common */

h1 {
  font-size: 1.8rem;
  padding: 1rem 0;
}

h2 {
  font-size: 1.6rem;
  padding: 1rem 0;
}

a {
  text-decoration: none;
}

a:hover {
  color: rgb(0, 0, 0);
  font-size: 115%;
}

ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

li {
  margin-top: 1rem;
}
input,
select,
textarea,
button {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 0.1rem black solid;
  font-size: 1.6rem;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
button {
  background-color: linen;
  cursor: pointer;
}
input:hover,
select:hover,
textarea:hover,
button:hover {
  border: 0.001rem black solid;
}

button.primary {
  background-color: red;
}

button.block {
  width: 100%;
}

button.small {
  font-size: 1.2rem;
}

header a {
  color: black;
  padding: 1rem;
}

.row.center {
  justify-content: center;
}

/* Image */
img {
  border-radius: 0.5rem;
}

img.small {
  max-width: 5rem;
  width: 100%;
}

img.medium {
  max-width: 29rem;
  width: 100%;
}

img.large {
  width: 100%;
}

.card {
  border: 0.2rem black solid;
  background-color: rgb(131, 212, 240);
  border-radius: 0.5rem;
  margin: 1rem;
}

.card-body {
  padding: 1rem;
}

.card-body > * {
  margin-bottom: 0.5rem;
  color: black;
}

.price {
  font-size: 2rem;
  color: white;
}

/* rating */

.rating span {
  color: gold;
  margin: 0.1rem;
}

.rating span:last-child {
  color: black;
}
/*Alert*/
.loading {
  display: block !important;
}
.success {
  color: chartreuse;
}

.error {
  color: rgb(255, 0, 0);
}

.alert {
  padding: 1rem;
  border: 0.1rem solid transparent;
  border-radius: 0.5rem;
}

.alert-info {
  color: blue;
  color: red;
}

.alert-danger {
  color: red;
  color: red;
}

.alert-success {
  color: #20a020;
  background-color: #eeffe0;
}

/* Dropdown */
.dropdown {
  display: inline-block;
  position: relative;
}
.dropdown-content {
  position: absolute;
  display: none;
  right: 0;
  min-width: 12rem;
  padding: 1rem;
  z-index: 1;
  background-color: #2e86de;
  margin: 0;
  margin-top: 0.4rem;
  border-radius: 0.5rem;
}
.dropdown:hover .dropdown-content {
  display: block;
}

/* Checkout Steps */

.checkout-steps > div {
  border-top: 0.3rem #c0c0c0 solid;
  color: #c0c0c0;
  flex: 1;
  padding: 1rem;
  font-weight: bold;
}
.checkout-steps > div.active {
  border-top-color: #f08000;
  color: #f08000;
}

/* Table */
.table {
  width: 100%;
  border-collapse: collapse;
}
.table tbody tr:nth-of-type(odd) {
  background-color: #f4f4f4;
}
.table td,
.table th {
  text-align: left;
  border: 0.1rem solid #e4e4e4;
  padding: 0.5rem;
}
.table button {
  margin: 0 0.2rem;
}

/* Carousel */
.carousel .slide img {
  max-width: 30rem;
}

.row.start {
  justify-content: flex-start;
}
.col-3 {
  flex: 32 1 75rem;
}
.p-1 {
  padding: 1rem;
}

/* Search */
.search button {
  border-radius: 0 0.5rem 0.5rem 0;
  border-right: none;
  margin-right: 0.5rem;
}

.search input {
  border-radius: 0.5rem 0 0 0.5rem;
  border-right: none;
  margin-left: 0.5rem;
}

/* Aside */
aside {
  position: fixed;
  width: 30rem;
  height: 100%;
  background-color: rgb(108, 218, 255);
  z-index: 1000;
  transform: translateX(-30rem);
  transition: all 0.5s;
}
aside.open {
  transform: translateX(0);
}
button.open-sidebar {
  font-size: 3rem;
  padding: 0.2rem 0.5rem;
  margin: 0 0.5rem;
  background: none;
  color: #ffffff;
  cursor: pointer;
}
button.open-sidebar:hover {
  border-color: #ffffff;
}
aside ul {
  padding: 0;
  list-style: none;
}
aside li {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
button.close-sidebar {
  padding: 0.3rem 0.8rem;
}
.active {
  font-weight: bold;
}

/* Map */
.full-container {
  margin: -1rem;
  height: calc(100% + 2rem);
}
.map-input-box {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0.5rem auto;
  width: 25rem;
  height: 4rem;
  display: flex;
}
.map-input-box input {
  border-radius: 1rem 0 0 1rem;
  border-right: 0;
}
.map-input-box button {
  border-radius: 0 1rem 1rem 0;
  border-left: 0;
}

/* Pagination */
.pagination a {
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  border: 0.1rem #a4a4a4 solid;
  font-size: 1.6rem;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.pagination a.active {
  font-weight: bold;
}

/* Dashboard */

.summary > li {
  border: 0.1rem #c0c0c0 solid;
  margin: 2rem;
  border-radius: 0.5rem;
  flex: 1 1 20rem;
}
.summary-title {
  font-size: 2rem;
  padding: 1rem;
}
.summary-body {
  font-size: 4rem;
  padding: 1rem;
  text-align: center;
}

.summary-title.color1 {
  background-color: #f0e0e0;
}
.summary-title.color2 {
  background-color: #e0f0e0;
}
.summary-title.color3 {
  background-color: #e0e0f0;
}
.alert-success {
  color: #20a020;
  background-color: #eeffe0;
}

/* Dropdown */
.dropdown {
  display: inline-block;
  position: relative;
}
.dropdown-content {
  position: absolute;
  display: none;
  right: 0;
  min-width: 12rem;
  padding: 1rem;
  z-index: 1;
  background-color: #2e86de;
  margin: 0;
  margin-top: 0.4rem;
  border-radius: 0.5rem;
}
.dropdown:hover .dropdown-content {
  display: block;
}

/* Checkout Steps */

.checkout-steps > div {
  border-top: 0.3rem #c0c0c0 solid;
  color: #c0c0c0;
  flex: 1;
  padding: 1rem;
  font-weight: bold;
}
.checkout-steps > div.active {
  border-top-color: #f08000;
  color: #f08000;
}

/* Table */
.table {
  width: 100%;
  border-collapse: collapse;
}
.table tbody tr:nth-of-type(odd) {
  background-color: #f4f4f4;
}
.table td,
.table th {
  text-align: left;
  border: 0.1rem solid #e4e4e4;
  padding: 0.5rem;
}
.table button {
  margin: 0 0.2rem;
}

/* Carousel */
.carousel .slide img {
  max-width: 30rem;
}

.row.start {
  justify-content: flex-start;
}
.col-3 {
  flex: 32 1 75rem;
}
.p-1 {
  padding: 1rem;
}

/* Search */
.search button {
  border-radius: 0 0.5rem 0.5rem 0;
  border-right: none;
  margin-right: 0.5rem;
}

.search input {
  border-radius: 0.5rem 0 0 0.5rem;
  border-right: none;
  margin-left: 0.5rem;
}

/* Aside */
aside {
  position: fixed;
  width: 30rem;
  height: 100%;
  background-color: rgb(108, 218, 255);
  z-index: 1000;
  transform: translateX(-30rem);
  transition: all 0.5s;
}
aside.open {
  transform: translateX(0);
}
button.open-sidebar {
  font-size: 3rem;
  padding: 0.2rem 0.5rem;
  margin: 0 0.5rem;
  background: none;
  color: #ffffff;
  cursor: pointer;
}
button.open-sidebar:hover {
  border-color: #ffffff;
}
aside ul {
  padding: 0;
  list-style: none;
}
aside li {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
button.close-sidebar {
  padding: 0.3rem 0.8rem;
}
.active {
  font-weight: bold;
}

/* Map */
.full-container {
  margin: -1rem;
  height: calc(100% + 2rem);
}
.map-input-box {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0.5rem auto;
  width: 25rem;
  height: 4rem;
  display: flex;
}
.map-input-box input {
  border-radius: 1rem 0 0 1rem;
  border-right: 0;
}
.map-input-box button {
  border-radius: 0 1rem 1rem 0;
  border-left: 0;
}

/* Pagination */
.pagination a {
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  border: 0.1rem #a4a4a4 solid;
  font-size: 1.6rem;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.pagination a.active {
  font-weight: bold;
}

/* Dashboard */

.summary > li {
  border: 0.1rem #c0c0c0 solid;
  margin: 2rem;
  border-radius: 0.5rem;
  flex: 1 1 20rem;
}
