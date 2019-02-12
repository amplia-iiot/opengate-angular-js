angular.module('opengate-angular-js')
    .service('$entityQratingUtils', [function() {
        'use strict';

        function calculate(entityData) {
            var sumPerformances = 0,
                totalMedidas = 0,
                maxScore = 0,
                score = 0,
                qPerformance = 0,
                avgPerformance = 0;

            angular.forEach(entityData, function(dp) {
                var scoring = jsonPath(dp, "_value._current.scoring");
                if (scoring) {
                    sumPerformances += scoring[0].performance;
                    var curMaxScore = scoring[0].qrating.max_score;
                    if (curMaxScore > 0) {
                        score += (curMaxScore * scoring[0].performance) / 100;

                        maxScore += curMaxScore;
                    }

                    totalMedidas++;
                }
            });

            if (totalMedidas > 0 && sumPerformances > 0 && maxScore > 0) {
                avgPerformance = sumPerformances / totalMedidas;
                qPerformance = (score * 100) / maxScore;

                return {
                    qPerformance: qPerformance,
                    avgPerformance: avgPerformance,
                    medidas: totalMedidas,
                    maxScore: maxScore,
                    score: score
                };
            } else {
                return null;
            }
        }

        function calculateFlattened(entityData) {
            var sumPerformances = 0,
                totalMedidas = 0,
                maxScore = 0,
                score = 0,
                qPerformance = 0,
                avgPerformance = 0;

            angular.forEach(entityData, function(objectData, key) {
                if (objectData) {
                    var dp;

                    if (objectData._value && objectData._value && objectData._value._current && objectData._value._current.scoring && objectData._value._current.scoring.qrating && objectData._value._current.scoring.performance) {
                        dp = objectData;
                    } else if (objectData[0] && objectData[0]._value && objectData[0]._value && objectData[0]._value._current && objectData[0]._value._current.scoring && objectData[0]._value._current.scoring.qrating && objectData[0]._value._current.scoring.performance) {
                        dp = objectData[0];
                    }

                    if (dp) {
                        var scoring = dp._value._current.scoring;
                        sumPerformances += scoring.performance;
                        var curMaxScore = scoring.qrating.max_score;
                        if (curMaxScore > 0) {
                            score += (curMaxScore * scoring.performance) / 100;

                            maxScore += curMaxScore;
                        }

                        totalMedidas++;
                    }
                }
            });

            if (totalMedidas > 0 && sumPerformances > 0 && maxScore > 0) {
                avgPerformance = sumPerformances / totalMedidas;
                qPerformance = (score * 100) / maxScore;

                return {
                    qPerformance: qPerformance,
                    avgPerformance: avgPerformance,
                    medidas: totalMedidas,
                    maxScore: maxScore,
                    score: score
                };
            } else {
                return null;
            }
        }

        return {
            calculate: calculate,
            calculateFlattened: calculateFlattened
        };
    }]);