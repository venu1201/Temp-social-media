export default {
    name:'user',
    tittle:'User',
    type:'document',
    fields:[
        {
            name:'username',
            title:'Username',
            type:'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
    ]
}