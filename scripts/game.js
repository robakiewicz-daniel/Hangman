class Quote{
    constructor(text){
        this.text=text;
        this.guessed= [];
    }

    getContent(){
        let content = ''
        for(const char of this.text){
            if (char == ' ' || this.guessed.includes(char) ){
                content += char ;
            }else{
                content +='_';
            }
        }
        return content;
    }

    guess(letter){
        if( !this.text.includes(letter) ){
            return false;
        }else{
        this.guessed.push(letter);
        return true;}


    }
}

class Game{

    currentStep = 0;

    lastStep = 7;

    quotes =[
        {
            text:'pan tadeusz',
            category: 'Utwór literacki',
        },
        {
            text:'janko muzykant',
            category:'Utwór literacki',
        },
        {
            text:'ogniem i mieczem',
            category:'Utwór literacki',
        },
        {
            text:'Kinder niespodzianka',
            category:'Słodycz',
        }
    ];

    constructor({lettersWrapper, categoryWrapper, wordWrapper,outputWrapper}){

        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;

        const {text, category} = this.quotes[Math.floor(Math.random()*this.quotes.length)];
        console.log(text, category);
        this.categoryWrapper.innerHTML=category;
        this.quote=new Quote(text);
    }

    guess(letter){
        if(this.quote.guess(letter)){
            this.drawQuote();
        }
        else{
            this.currentStep++;
            document.getElementsByClassName('step')[this.currentStep].style.opacity =1;
            if(this.currentStep==this.lastStep){
                this.loosing();
            }
        }
    }

    wining(){
        this.wordWrapper.innerHTML ='Gratulacje wygrywasz';
        this.lettersWrapper.innerHTML='';
    }

    loosing(){
        this.wordWrapper.innerHTML ='Niestety przegrałeś';
        this.lettersWrapper.innerHTML='';
    }

    drawLetters(){
        for(let i=0; i<26;i++){
            const label = (i+10).toString(36);
            const button = document.createElement('button');
            button.innerHTML = label;
            button.addEventListener('click', ()=>{
            this.guess(label);
            button.classList.add("hidden");
            button.setAttribute("disabled", true);
            console.log(button)
            });
            this.lettersWrapper.appendChild(button);
        }
    }

    drawQuote(){
        const content = this.quote.getContent();
        this.wordWrapper.innerHTML = content;

        if(!content.includes('_')){
            this.wining()
        }
    }

    start(){

        document.getElementsByClassName('step')[this.currentStep].style.opacity =1;
        this.drawLetters();
        this.drawQuote();
        
    }

}
