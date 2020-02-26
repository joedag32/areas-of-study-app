var areasOfStudyApp = new Vue({
    mixins: [Vue2Filters.mixin],
    el: '#areasOfStudy',
    data: {
        modernSupport: false,
        studyAreas: [],                                                               
        message: "",
        studyType: "all",
        studyDelivery: "all"
    },
    created() {
        // Load JSON data
        fetch('sample-02.json').then(response => response.json())
            .then((data) => {
                this.studyAreas = data;
                this.modernSupport = true;
                // remove default html from DOM
                document.getElementById('initialMarkup').remove();
                // converts JSON to an array of objects
                var programsArray = [];
                for (var p in this.studyAreas) {
                    var tempObj = new Object();
                    for (var k in this.studyAreas[p]) {
                        tempObj[k] = this.studyAreas[p][k];
                    }
                    programsArray.push(tempObj);
                }
                this.studyAreas = programsArray;
            })
            .catch((error) => {
                console.error('Error:', error);
                this.modernSupport = false;
        });
    },
    computed: {
        filteredAreasStudy: function () {
            // fiter using the form fields
            let filtered = this.studyAreas;
            if (this.message) {
                filtered = this.studyAreas.filter(
                    m => m.title.toLowerCase().indexOf(this.message) > -1 || m.tags.toLowerCase().indexOf(this.message) > -1 || m.school.toLowerCase().indexOf(this.message) > -1
                );
            }
            if (this.studyType != 'all') {
                filtered = filtered.filter(
                    m => m.type.toLowerCase() === this.studyType.toLowerCase()
                );
            }
            if (this.studyDelivery != 'all') {
                filtered = filtered.filter(
                    m => m.delivery.toLowerCase() === this.studyDelivery.toLowerCase()
                );
            }
            return filtered;
        }
    }
})