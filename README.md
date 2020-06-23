# areas-of-study-app
Vue2 App to filter school Areas of Study/Degrees/Programs from a JSON source.

## JSON format

The expected JSON format is:

```
{
  "1": {
    "school":"School of Arts &amp; Humanities",
    "title":"Studies in the Arts, BA",
    "tags":"dance music",
    "type":"Undergraduate",
    "link":"/arts-humanities/academic-programs.html"
   },
  "2": {
    "school":"School of Business",
    "title":"Minor in Computer Information Systems",
    "tags":"database",
    "type":"Minor",
    "link":"/business/computer-information-systems.html"
   }...
}
```

Please update `sample-02.json` to your json source in `areas-of-study.js`

## Scripts and Dependencies

Please replace the vue.js include with the production link if you're using the CDN. This example is using the development version for error checking.

https://vuejs.org/v2/guide/installation.html

