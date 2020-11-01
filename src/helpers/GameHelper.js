import {gameTypes} from '../constants/constants';

function getInitialGameConfigurations(gameType) {
    let gameConfigs = {
        currentLevel: 0,
        start: true,
        won: false,
    };

    let initalLevelStatus = {
        status: null,
        finished: false
    };

    let mazeSize;

    switch (gameType) {
        case gameTypes.PIECE_OF_CAKE:
            mazeSize = 6;

            initalLevelStatus.cellSize = 50;
            initalLevelStatus.mazeSize = mazeSize;
            initalLevelStatus.movementsLeft = 1000;
            initalLevelStatus.goalPosition = {
                x: mazeSize - 1,
                y: mazeSize - 1
            };

            gameConfigs.levels = [
                {...initalLevelStatus, isLastLevel: true}
            ];
            break;
        case gameTypes.EASY:
            mazeSize = 10;

            initalLevelStatus.cellSize = 40;
            initalLevelStatus.mazeSize = mazeSize;
            initalLevelStatus.movementsLeft = 50;
            initalLevelStatus.goalPosition = {
                x: mazeSize - 1,
                y: mazeSize - 1
            };

            gameConfigs.levels = [
                {...initalLevelStatus},
                {...initalLevelStatus, isLastLevel: true}
            ];
            break;
        case gameTypes.NORMAL:
            mazeSize = 16;

            initalLevelStatus.cellSize = 40;
            initalLevelStatus.mazeSize = mazeSize;
            initalLevelStatus.movementsLeft = 55;
            initalLevelStatus.goalPosition = {
                x: mazeSize - 1,
                y: mazeSize - 1
            };

            gameConfigs.levels = [
                {...initalLevelStatus},
                {...initalLevelStatus},
                {...initalLevelStatus, isLastLevel: true}
            ];
            break;
        case gameTypes.HARD:
            mazeSize = 20;

            initalLevelStatus.cellSize = 30;
            initalLevelStatus.mazeSize = mazeSize;
            initalLevelStatus.movementsLeft = 120;
            initalLevelStatus.goalPosition = {
                x: mazeSize - 1,
                y: mazeSize - 1
            };

            gameConfigs.levels = [
                {...initalLevelStatus},
                {...initalLevelStatus},
                {...initalLevelStatus},
                {...initalLevelStatus, isLastLevel: true}
            ];
            break;
        case gameTypes.VERY_HARD:
            mazeSize = 26;

            initalLevelStatus.cellSize = 26;
            initalLevelStatus.mazeSize = mazeSize;
            initalLevelStatus.movementsLeft = 150;
            initalLevelStatus.goalPosition = {
                x: mazeSize - 1,
                y: mazeSize - 1
            };

            gameConfigs.levels = [
                {...initalLevelStatus},
                {...initalLevelStatus},
                {...initalLevelStatus},
                {...initalLevelStatus},
                {...initalLevelStatus, isLastLevel: true}
            ];
            break;
        case gameTypes.PAIN:
            mazeSize = 40;

            initalLevelStatus.cellSize = 20;
            initalLevelStatus.mazeSize = mazeSize;
            initalLevelStatus.movementsLeft = 250;
            initalLevelStatus.goalPosition = {
                x: mazeSize - 1,
                y: mazeSize - 1
            };

            gameConfigs.levels = [
                {...initalLevelStatus},
                {...initalLevelStatus},
                {...initalLevelStatus},
                {...initalLevelStatus},
                {...initalLevelStatus},
                {...initalLevelStatus, isLastLevel: true}
            ];
            break;
        default:
            return;
    }

    return gameConfigs;
}

export {
    getInitialGameConfigurations
}
