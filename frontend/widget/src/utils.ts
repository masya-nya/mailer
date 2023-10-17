import { ISelectItem } from './types/switherTypes'

export const findMatch = (matchWord: string, ListToFilterByMatchWord: Array<ISelectItem>) => {
    if (!matchWord) {
        return ListToFilterByMatchWord
    }
    // спецсимволы, которые необходимо экранировать перед созданием регулярного выражения
    const specs = '(){}[]'
    for (let i = 0; i < specs.length; i++)
        if (matchWord.includes(specs[i])) {
            matchWord = matchWord.replaceAll(specs[i], `\\` + specs[i])
        }
    const rgx = new RegExp(matchWord, 'gi')
    return (ListToFilterByMatchWord.filter(item => item.name.match(rgx)))
}


export const copyWithout = <T extends {}>(src: Record<string, T>, excludes: string[]): Record<string, T> => {
    return Object.keys(src).reduce((result: Record<string, T>, prop: string) => {
        if (!excludes.includes(prop)) {
            result[prop] = src[prop];
            return result;
        }
        return result;
    }, {});
}

