function coolGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const playerImage = new Image();
    playerImage.src = 'img/cat.png'; // Set the path to your player image

    const endImage = new Image();
    endImage.src = 'img/dino.png'; // Set the path to your end position image

    const player = {
        x: 50,
        y: 50,
        width: 50,
        height: 50
    };

    const end = {
        x: 700,
        y: 500,
        width: 50,
        height: 50
    };

    const walls = [
        { x: 0, y: 0, width: canvas.width, height: 10 }, // Top border
        { x: 0, y: 0, width: 10, height: canvas.height }, // Left border
        { x: canvas.width - 10, y: 0, width: 10, height: canvas.height }, // Right border
        { x: 0, y: canvas.height - 10, width: canvas.width, height: 10 }, // Bottom border
        { x: 100, y: 100, width: 600, height: 10 }, // Horizontal wall
        { x: 100, y: 200, width: 10, height: 300 }, // Vertical wall
    ];

    const numberOfRandomWalls = 5;

    // Function to generate random walls
    function generateRandomWalls() {
        for (let i = 0; i < numberOfRandomWalls; i++) {
            const randomWall = {
                x: Math.random() * (canvas.width - 100),
                y: Math.random() * (canvas.height - 100),
                width: (Math.random() < 0.5 ? 100 : 10),
                height: (Math.random() < 0.5 ? 10 : 100)
            };
            walls.push(randomWall);
        }
    }

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
        ctx.drawImage(endImage, end.x, end.y, end.width, end.height);
        walls.forEach(wall => {
            ctx.fillStyle = 'black';
            ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
        });
    }

    function checkCollisionWithWalls(nextX, nextY) {
        for (let wall of walls) {
            if (nextX < wall.x + wall.width &&
                nextX + player.width > wall.x &&
                nextY < wall.y + wall.height &&
                player.height + nextY > wall.y) {
                return true;
            }
        }
        return false;
    }

    function movePlayer(event) {
        let nextX = player.x;
        let nextY = player.y;

        switch (event.keyCode) {
            case 37: // left
                nextX -= 10;
                break;
            case 38: // up
                nextY -= 10;
                break;
            case 39: // right
                nextX += 10;
                break;
            case 40: // down
                nextY += 10;
                break;
        }

        if (!checkCollisionWithWalls(nextX, nextY)) {
            player.x = nextX;
            player.y = nextY;
        }

        checkCollision();
        drawGame();
    }


    function checkCollision() {
        if (player.x < end.x + end.width &&
            player.x + player.width > end.x &&
            player.y < end.y + end.height &&
            player.height + player.y > end.y) {
            alert("gang weed bottom text");
            document.getElementById("section11").remove();
            document.getElementById("section12").style.display = "block";
            doDinoGame();
        }
    }

    function movePlayer(event) {
        let nextX = player.x;
        let nextY = player.y;

        switch (event.keyCode) {
            case 37: // left
                nextX -= 10;
                break;
            case 38: // up
                nextY -= 10;
                break;
            case 39: // right
                nextX += 10;
                break;
            case 40: // down
                nextY += 10;
                break;
        }

        if (!checkCollisionWithWalls(nextX, nextY)) {
            player.x = nextX;
            player.y = nextY;
        }

        checkCollision();
        drawGame();
    }

    window.addEventListener('keydown', movePlayer);
    window.onload = function () {
        generateRandomWalls();
        drawGame();
    }
}
