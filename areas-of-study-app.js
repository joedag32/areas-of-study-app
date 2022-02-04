var areasOfStudyApp = new Vue({
    mixins: [Vue2Filters.mixin],
    el: '#areasOfStudy',
    data: {
        modernSupport: false,
        studyAreas: [],
        message: "",
        studyType: "all",
        schoolAcronym: "",
        urlParam: ""
    },
    created() {
        // Load JSON data
        fetch('sample-01.json', {
            cache: "no-cache",
            header: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
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
                // get and set filter if url variable is present
                this.urlParam = window.location.search.substring(1);
                if (this.urlParam === 'undergraduate' || this.urlParam === 'graduate') {
                    this.studyType = this.urlParam;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                this.modernSupport = false;
            });
        if (sessionStorage.message) {
            this.message = sessionStorage.message;
        }
    },
    methods: {
        shortenSchoolName: function (school) {
            switch (school) {
                case 'School of Arts &amp; Humanities':
                    return 'arhu';
                case 'School of Business':
                    return 'busn';
                case 'School of Education':
                    return 'educ';
                case 'School of General Studies &amp; Graduate Education':
                    return 'gens';
                case 'School of Health Sciences':
                    return 'hlth';
                case 'School of Natural Sciences &amp; Mathematics':
                    return 'nams';
                case 'School of Social &amp; Behavioral Sciences':
                    return 'sobl';
            }
        },
        messageChange: function (event) {
            // send event to Google Analytics, remove if you do not wish to track
            if (this.message.length > 4) {
                gtag('event', 'keyword', { 
                    'event_category': 'areas_of_study_app', 
                    'event_label': this.message
                });
            }
        }
    },
    computed: {
        filteredAreasStudy: function () {
            // fiter using the form fields
            let filtered = this.studyAreas;

            // only compare if the total message typed is more than 2 characters
            if (this.message.length > 2) {
                // break message into array split on spaces
                let messageArray = this.message.split(' ');
                filtered = this.studyAreas.filter(function (m) {
                    for (let i = 0; i < messageArray.length; i++) {
                        // only compare if the word typed is more than 2 characters
                        if (messageArray[i].length > 2) {
                            if (m.title.toLowerCase().indexOf(messageArray[i].toLowerCase()) > -1 || m.tags.toLowerCase().indexOf(messageArray[i].toLowerCase()) > -1 || m.school.toLowerCase().indexOf(messageArray[i].toLowerCase()) > -1) {
                                return true;
                            }
                        }
                    }
                });
            }
            if (this.studyType != 'all') {
                filtered = filtered.filter(
                    m => m.type.toLowerCase().replace(/\s+/g, '') === this.studyType.toLowerCase()
                );
            }
            return filtered;
        }
    },
    watch: {
        message(newMessage) {
            sessionStorage.message = newMessage;
        }
    }
})
