export function CorrectObject(obj) {
    try {
        obj = JSON.parse(obj)
    } catch (event) {
        console.log(event.name);
        console.log(event.message);
        return console.log('Не корректный JSON')
    }

    let NewObj = obj.filter(item => {
        if (item.parent == null) {
            delElement(obj, item)
            return item
        }
    })
    let count = 0;

    function recurce(params) {
        count++;
        if (count > obj.length + 1) {
            return
        }

        params.forEach(firstChild => {
            firstChild.children = []
            obj.forEach(element => {
                if (element.parent == firstChild.code) {
                    firstChild.children.push(element)
                    recurce(firstChild.children)
                }
            });

        });


    }

    recurce(NewObj)

    return NewObj
}

function delElement(obj, elem) {
    elem = obj.findIndex(i => i.code == elem.code)
    obj.splice(elem, 1);
}