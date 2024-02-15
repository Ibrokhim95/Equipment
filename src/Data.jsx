import formworkImg from '../src/assets/images/formwork.jpg'
import mixerImg from '../src/assets/images/mixer.webp'
import scaffoldingImg from '../src/assets/images/scaffolding.webp'
import toolsImg from '../src/assets/images/tools.jpg'
import wheelbarrow from '../src/assets/images/wheelbarrow.jpg'
import spotlight from '../src/assets/images/spotlight.jpg'
import bayok from '../src/assets/images/bayok.webp'
import barrel from '../src/assets/images/barrel.webp'
import {v4 as uuidv4} from 'uuid'

const products = [
   {id: 1, title: 'Opalobka', value: 'formwork', img: formworkImg, data: [
      {
         id: uuidv4(),
         title: 'opalobka',
         height: "25",
         length: '1',
         select: ['metr', 'dona'],
      },
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '25',
         length: '1.5',
         select: ['metr', 'dona'],
      },
      {  
         id: uuidv4(),
         title: 'opalobka',
         height: '25',
         length: '2',
         select: ['metr', 'dona'],
      },
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '25',
         length: '2.5',
         select: ['metr', 'dona'],
      },
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '25',
         length: '3',
         select: ['metr', 'dona'],
      },
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '25',
         length: '3.5',
         select: ['metr', 'dona'],
      },
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '25',
         length: '4',
         select: ['metr', 'dona'],
      },
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '40',
         length: '1',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '40',
         length: '1.5',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '40',
         length: '2',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '40',
         length: '2.5',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '40',
         length: "3",
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '40',
         length: '3.5',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '40',
         length: '4',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '50',
         length: '1',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '50',
         length: '1.5',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '50',
         length: '2',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '50',
         length: '2.5',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '50',
         length: '3',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '50',
         length: '3.5',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '50',
         length: "4",
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '60',
         length: "1",
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '60',
         length: '1.5',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '60',
         length: '2',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '60',
         length: '2.5',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '60',
         length: '3',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '60',
         length: '3.5',
         select: ['metr', 'dona'],
      },   
      {
         id: uuidv4(),
         title: 'opalobka',
         height: '60',
         length: '4',
         select: ['metr', 'dona'],
      },
   ]},
   {id: 2, title: 'Lesa', value: 'scaffolding', img: scaffoldingImg, data: [
      {id: uuidv4(), title: 'lesa', select: ['dona', 'komp'],},
   ]},
   {id: 3, title: 'Meshalka', value: 'mixer', img: mixerImg, data: [
      {id: uuidv4(), title: 'meshalka', select: ['dona'],}
   ]},
   {id: 4, title: 'Boshqalar', value: 'others', img: toolsImg, data: [
      {id: uuidv4(), title: 'otboyniy', select: ['kun', 'soat'],},
      {id: uuidv4(), title: 'perforator', select: ['kun', 'soat'],},
      {id: uuidv4(), title: 'bolgarka', select: ['kun', 'soat'],},
      {id: uuidv4(), title: 'svarka apparat', select: ['kun', 'soat'],},
      {id: uuidv4(), title: 'drel', select: ['kun', 'soat'],},
      {id: uuidv4(), title: 'kompressor', select: ['kun', 'soat'],},
   ]},
   {id: 5, title: 'Arava', value: "wheelbarrow", img: wheelbarrow, data: [
      {id: uuidv4(), title: 'arava katta', select: ['dona'],},
      {id: uuidv4(), title: 'arava kichik', select: ['dona'],},
   ]},
   {id: 6, title: 'Projektor', value: 'spotlight', img: spotlight, data: [
      {id: uuidv4(), title: 'projektor', select: ['dona']}
   ]},
   {id: 7, title: 'Bayok', value: "bayok", img: bayok, data: [
      {id: uuidv4(), title: 'bayok katta', select: ['dona']},
      {id: uuidv4(), title: 'bayok kichik', select: ['dona']},
      {id: uuidv4(), title: 'karita', select: ['dona']},
   ]},
   {id: 8, title: 'Bochka', value: 'barrel', img: barrel, data: [
      {id: uuidv4(), title: 'bochka', select: ['dona']}
   ]}
]


const images = [formworkImg, mixerImg, scaffoldingImg, toolsImg]

export {products, images}