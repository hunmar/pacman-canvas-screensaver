scene = document.getElementById('canvas');
sceneContext = scene.getContext('2d');

sceneWidthInBlocks = 32; //ширина в блоках может меняться
sceneHeightInBlocks = 32; //высота в блоках всегда одинаковая
sceneBlockSize = 32; //рандомный размер блока в пикселях
sceneMatrix = [];

init();

function init()
{
    //window.onresize = initScene; //ресайз сцены потребует изменения размера матрицы
    initScene();
    initMatrix();
    drawMatrix();
}

function initScene()
{
    scene.width = document.body.clientWidth;
    scene.height = document.body.clientHeight;


    sceneBlockSize = Math.floor(scene.height / sceneHeightInBlocks);
    scene.height = sceneBlockSize * sceneHeightInBlocks;
    sceneWidthInBlocks = parseInt(scene.width / sceneBlockSize);

    sceneContext.fillRect(0, 0, scene.width, scene.height);

    //временно поиграться

    initMatrix();
    drawMatrix();
    setTimeout(initScene,1000);
}

function initMatrix()
{
    for(var i=0; i<sceneWidthInBlocks; i++)
    {
        sceneMatrix[i] = new Array(sceneHeightInBlocks);
    }

    createPath();

    for(var i=0; i<sceneWidthInBlocks; i++)
    {
        for(var j=0; j<sceneHeightInBlocks; j++)
        {
            if (sceneMatrix[i][j] != 2)
            sceneMatrix[i][j] = Math.floor((Math.random()*2));
        }
    }
}

function drawMatrix()
{
    for(var i=0; i<sceneWidthInBlocks; i++)
        for(var j=0; j<sceneHeightInBlocks; j++)
        {
            if (sceneMatrix[i][j] == 1)
                drawWall(i,j);
            if (sceneMatrix[i][j] == 2)
                drawCoin(i,j);
        }
}

function drawWall(blockX, blockY)
{
    sceneContext.fillStyle = '#FF0000';
    sceneContext.strokeStyle = '#4d59ff';
    var topLeftX = blockX*sceneBlockSize;
    var topLeftY = blockY*sceneBlockSize;
    sceneContext.strokeRect(topLeftX, topLeftY, sceneBlockSize, sceneBlockSize);

}

function drawCoin(blockX, blockY)
{
    sceneContext.fillStyle = '#FF0000';
    sceneContext.strokeStyle = '#00ff00';
    var topLeftX = blockX*sceneBlockSize;
    var topLeftY = blockY*sceneBlockSize;
    sceneContext.strokeRect(topLeftX, topLeftY, sceneBlockSize, sceneBlockSize);

}

function createPath()
{
    var startBlockX = 0;
    var startBlockY = Math.floor((Math.random()*sceneHeightInBlocks));
    sceneMatrix[startBlockX][startBlockY] = 2;
    makeStep(startBlockX, startBlockY)
}

function makeStep(blockX, blockY)
{

    if (blockX == sceneWidthInBlocks - 1)
        return;

    var isStepMade = false;

    while (!isStepMade)
    {

        if (blockY > 1)
        {
            if (sceneMatrix[blockX][blockY-1] != 2)
            {
                if (Math.floor((Math.random()*2)) == 1)
                {
                    isStepMade = true;
                    sceneMatrix[blockX][blockY-1] = 2;

                    makeStep(blockX, blockY-1);
                    return;
                }
            }
        }

        if (sceneMatrix[blockX+1][blockY] != 2)
        {
            if (Math.floor((Math.random()*2)) == 1)
            {
                isStepMade = true;
                sceneMatrix[blockX+1][blockY] = 2;

                makeStep(blockX+1, blockY);
                return;
            }
        }

        if (sceneMatrix[blockX][blockY+1] != 2)
        {
            if (Math.floor((Math.random()*2)) == 1)
            {
                isStepMade = true;
                sceneMatrix[blockX][blockY+1] = 2;

                makeStep(blockX, blockY+1);
                return;
            }
        }


    }
}