'use strict';
angular.module('opengate-angular-js').service('$oguxThemes', [
    function() {
        var themeCompositionTheme = 'light';
        var themeCompositionColor = 'orange';
        var themeComposition = themeCompositionTheme + ' ' + themeCompositionColor;

        var themes = [{
            'name': 'default'
        }, {
            'name': 'light'
        }];

        var colorThemes = {
            'red': {
                'id': 'red',
                'sample': '#f44336',
                'sampleType': 'normal',
                'rgba': 'rgba(244, 67, 54, 0.5)',
                'name': 'COLOR.RED',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_red.css']
            },
            'neon-red': {
                'id': 'neon-red',
                'sample': '#f44336',
                'sampleType': 'neon',
                'rgba': 'rgba(244, 67, 54, 0.5)',
                'name': 'COLOR.NEON_RED',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-red.css']
            },
            'darkneon-red': {
                'id': 'darkneon-red',
                'sample': '#f44336',
                'sampleType': 'neon',
                'rgba': 'rgba(244, 67, 54, 0.5)',
                'name': 'COLOR.DARK_NEON_RED',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-red.css']
            },
            'pink': {
                'id': 'pink',
                'sample': '#e91e63',
                'rgba': 'rgba(233, 30, 99, 0.5)',
                'name': 'COLOR.PINK',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_pink.css']
            },
            'purple': {
                'id': 'purple',
                'sample': '#9c27b0',
                'rgba': 'rgba(156, 39, 176, 0.5)',
                'name': 'COLOR.PURPLE',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_purple.css']
            },
            'deeppurple': {
                'id': 'deeppurple',
                'sample': '#673ab7',
                'rgba': 'rgba(103, 10, 183, 0.5)',
                'name': 'COLOR.DEEP_PURPLE',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_deeppurple.css']
            },
            'indigo': {
                'id': 'indigo',
                'sample': '#3f51b5',
                'rgba': 'rgba(63, 81, 181, 0.5)',
                'name': 'COLOR.INDIGO',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_indigo.css']
            },
            'blue': {
                'id': 'blue',
                'sample': '#2196f3',
                'rgba': 'rgba(33, 150, 243, 0.5)',
                'name': 'COLOR.BLUE',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_blue.min.css']
            },
            'neon-blue': {
                'id': 'neon-blue',
                'sample': '#2196f3',
                'sampleType': 'neon',
                'rgba': 'rgba(33, 150, 243, 0.5)',
                'name': 'COLOR.NEON_BLUE',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-blue.css']
            },
            'darkneon-blue': {
                'id': 'darkneon-blue',
                'sample': '#2196f3',
                'sampleType': 'neon',
                'rgba': 'rgba(33, 150, 243, 0.5)',
                'name': 'COLOR.DARK_NEON_BLUE',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-blue.css']
            },
            'lightblue': {
                'id': 'lightblue',
                'sample': '#03a9f4',
                'rgba': 'rgba(3, 169, 244, 0.5)',
                'name': 'COLOR.LIGTH_BLUE',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_lightblue.css']
            },
            'cyan': {
                'id': 'cyan',
                'sample': '#00bcd4',
                'rgba': 'rgba(0, 188, 212, 0.5)',
                'name': 'COLOR.CYAN',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_cyan.min.css']
            },
            'teal': {
                'id': 'teal',
                'sample': '#009688',
                'rgba': 'rgba(0, 150, 136, 0.5)',
                'name': 'COLOR.TEAL',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_teal.min.css']
            },
            'neon-teal': {
                'id': 'neon-teal',
                'sample': '#009688',
                'sampleType': 'neon',
                'rgba': 'rgba(0, 150, 136, 0.5)',
                'name': 'COLOR.NEON_TEAL',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-teal.css']
            },
            'darkneon-teal': {
                'id': 'darkneon-teal',
                'sample': '#009688',
                'sampleType': 'neon',
                'rgba': 'rgba(0, 150, 136, 0.5)',
                'name': 'COLOR.DARK_NEON_TEAL',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-teal.css']
            },
            'green': {
                'id': 'green',
                'sample': '#4caf50',
                'rgba': 'rgba(76, 175, 80, 0.5)',
                'name': 'COLOR.GREEN',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_green.min.css']
            },
            'neon-green': {
                'id': 'neon-green',
                'sample': '#4caf50',
                'sampleType': 'neon',
                'rgba': 'rgba(76, 175, 80, 0.5)',
                'name': 'COLOR.NEON_GREEN',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-green.css']
            },
            'darkneon-green': {
                'id': 'darkneon-green',
                'sample': '#4caf50',
                'sampleType': 'neon',
                'rgba': 'rgba(76, 175, 80, 0.5)',
                'name': 'COLOR.DARK_NEON_GREEN',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-green.css']
            },
            'lightgreen': {
                'id': 'lightgreen',
                'sample': '#8bc34a',
                'rgba': 'rgba(139, 195, 74, 0.5)',
                'name': 'COLOR.LIGHT_GREEN',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_lightgreen.min.css']
            },
            'lime': {
                'id': 'lime',
                'sample': '#cddc39',
                'rgba': 'rgba(205, 220, 57, 0.5)',
                'name': 'COLOR.LIME',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_lime.min.css']
            },
            'yellow': {
                'id': 'yellow',
                'sample': '#ffeb3b',
                'rgba': 'rgba(255, 235, 59, 0.5)',
                'name': 'COLOR.YELLOW',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_yellow.min.css']
            },
            'amber': {
                'id': 'amber',
                'sample': '#ffc107',
                'rgba': 'rgba(255, 193, 7, 0.5)',
                'name': 'COLOR.AMBER',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_amber.min.css']
            },
            'neon-orange': {
                'id': 'neon-orange',
                'sample': '#ff9800',
                'sampleType': 'neon',
                'rgba': 'rgba(255, 152, 0, 0.5)',
                'name': 'COLOR.NEON_ORANGE',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-orange.css']
            },
            'darkneon-orange': {
                'id': 'darkneon-orange',
                'sample': '#ff9800',
                'sampleType': 'neon',
                'rgba': 'rgba(255, 152, 0, 0.5)',
                'name': 'COLOR.DARK_NEON_ORANGE',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-orange.css']
            },
            'orange': {
                'id': 'orange',
                'sample': '#ff9800',
                'rgba': 'rgba(255, 152, 0, 0.5)',
                'name': 'COLOR.ORANGE',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
            },
            'deeporange': {
                'id': 'deeporange',
                'sample': '#ff5722',
                'rgba': 'rgba(255, 87, 34, 0.5)',
                'name': 'COLOR.DEEP_ORANGE',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_deeporange.min.css']
            },
            'brown': {
                'id': 'brown',
                'sample': '#795548',
                'rgba': 'rgba(121, 85, 72, 0.5)',
                'name': 'COLOR.BROWN',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_brown.min.css']
            },
            'grey': {
                'id': 'grey',
                'sample': '#9e9e9e',
                'rgba': 'rgba(33, 150, 243, 1)',
                'name': 'COLOR.GREY',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_grey.min.css']
            },
            'neon-grey': {
                'id': 'neon-grey',
                'sample': '#9e9e9e',
                'sampleType': 'neon',
                'rgba': 'rgba(33, 150, 243, 1)',
                'name': 'COLOR.NEON_GREY',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-grey.css']
            },
            'darkneon-grey': {
                'id': 'darkneon-grey',
                'sample': '#9e9e9e',
                'sampleType': 'neon',
                'rgba': 'rgba(33, 150, 243, 1)',
                'name': 'COLOR.DARK_NEON_GREY',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-grey.css']
            },
            'bluegrey': {
                'id': 'bluegrey',
                'sample': '#607d8b',
                'rgba': 'rgba(96, 125, 139, 0.5)',
                'name': 'COLOR.BLUE_GREY',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_bluegrey.min.css']
            },
            'darkgrey': {
                'id': 'darkgrey',
                'sample': '#2D2D2D',
                'rgba': 'rgba(45, 45, 45, 0.5)',
                'name': 'COLOR.DARK_GREY',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_darkgrey.min.css']
            }
        };


        return {
            setThemeComposition: function(_themeComposition) {
                themeComposition = _themeComposition;
                var tc = themeComposition.split(' ');
                themeCompositionTheme = tc[0];
                themeCompositionColor = tc[1];
            },
            colors: function() {
                var availableColors = {};

                angular.forEach(colorThemes, function(config, color) {
                    if (!config.hidden) {
                        availableColors[color] = config;
                    }
                });

                return availableColors;
            },
            themes: function() {
                return themes;
            },
            getColorConfig: function(colorId) {
                if (colorThemes[colorId]) {
                    return colorThemes[colorId];
                } else {
                    return undefined;
                }
            },
            getColorsKeys: function() {
                return Object.keys(colorThemes);
            },
            colorsByTheme: function(theme) {
                var themeColors = [];
                angular.forEach(colorThemes, function(config, color) {
                    if (!config.hidden && config.theme.indexOf(theme) !== -1) {
                        themeColors.push(config);
                    }
                });
                return themeColors;
            },
            getThemeFromThemeComposition: function() {
                return themeCompositionTheme;
            },
            getColorFromThemeComposition: function() {
                return colorThemes[themeCompositionColor];
            },
            getColorsCombinationFromTheme: function() {
                var scheme = new ColorScheme;
                scheme.from_hex(colorThemes[themeCompositionColor].sample.substring(1));
                scheme.scheme('analogic');
                scheme.distance(1.0);
                scheme.add_complement(true);
                scheme.variation('light');

                return scheme.colors();
            },
            getColorsCombinationFromColor: function(color) {
                var scheme = new ColorScheme;
                scheme.from_hex(color.substring(1));
                scheme.scheme('analogic');
                scheme.distance(1.0);
                scheme.add_complement(true);
                scheme.variation('light');

                return scheme.colors();
            }
        };
    }
]);