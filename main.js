// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}


//Representação das bolas como objeto, começando adicionar o construtor com o código abaixo;

//Parâmetros de definição que cada bola precisa:
/*
* coordenadas x e y — coordenadas horizontal e vertical onde a bola vai começar na tela. Isso pode variar entre 0 (canto superior esquerdo) à largura e altura da janela de visualização do navegador (canto inferior direito).

* velocidade horizontal e vertical (velX e velY) — cada bola recebe uma velocidade horizontal e vertical; em termos reais, esses valores serão adicionados regularmente aos valores das coordenadas x/y quando começarmos a animar as bolas, para movê-las tanto em cada quadro.

* color — cada bola recebe uma cor.

* size — cada bola recebe um tamanho — este será o seu raio, em pixels.
*/


function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

//DESENHANDO A BOLA;
//Primeiro adicione o seguinte método draw() ao prototype do Ball():
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

let testBall = new Ball(50, 100, 4, 4, 'blue', 10);

testBall.x
testBall.size
testBall.color
testBall.draw()



//ATUALIZANDO OS DADOS DA BOLA;
/*
Podemos desenhar a bola na posição, mas para começar a mover a bola, precisamos de uma função de atualização de algum tipo. Adicione o seguinte código na parte inferior do seu arquivo JavaScript, para adicionar um método  update() ao prototype do Ball():
*/

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width){
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0){
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height){
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0){
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;

}
 //ADICIONANDO DETECÇAÕ DE COLISÃO.

  //Primeiro de tudo, adicione a seguinte definição de método abaixo onde você definiu o método  update() (ou seja, o bloco Ball.prototype.update).
  Ball.prototype.collisionDetect = function() {
    //Para cada bola, precisamos checar todas as outras bolas para ver se ela colidiu com a bola atual. Para fazer isso, abrimos outro loop for para percorrer todas as bolas no array balls[].

  for (let j = 0; j < balls.length; j++) {
      //Imediatamente dentro de nosso loop for, usamos uma instrução  if para verificar se a bola atual em loop é a mesma bola que estamos verificando no momento.

    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      //Em seguida, usamos um algoritmo comum para verificar a colisão de dois círculos. Estamos basicamente verificando se alguma das áreas dos dois círculos se sobrepõe

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
  
}


/* 
As primeiras quatro partes da função verificam se a bola atingiu a borda da tela. Se tiver, invertemos a polaridade da velocidade relevante para fazer a bola viajar na direção oposta. Assim, por exemplo, se a bola estava viajando para cima (positivo velY), então a velocidade vertical é alterada de forma que ela comece a viajar para baixo (negativo velY).

Nos quatro casos, estamos verificando se:

Se a coordenada x é maior que a largura da tela (a bola está saindo da borda direita).
Se a coordenada x é menor que 0 (a bola está saindo da borda esquerda).
Se a coordenada y é maior que a altura da tela (a bola está saindo da borda inferior).
Se a coordenada y é menor que 0 (a bola está saindo da borda superior).
*/


//ANIMANDO A BOLA.
//Primeiro, precisamos de um lugar para armazenar todas as nossas bolas. O array a seguir fará esse trabalho — adicione-o ao final do seu código agora:

let balls = [];

//Todos os programas que animam as coisas geralmente envolvem um loop de animação, que serve para atualizar as informações no programa e renderizar a visualização resultante em cada quadro da animação; esta é a base para a maioria dos jogos e outros programas.

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    while (balls.length < 25) {
      let size = random(10,20);
      let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(-7,7),
        random(-7,7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
      );
      balls.push(ball);
    }
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
      
      
    }
  
    requestAnimationFrame(loop);
  }

  
  //Chamando a função uma vez para iniciar a animação;

  loop();
 


 