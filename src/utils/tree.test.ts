import _ from 'lodash'
import { assert, describe, expect, it } from 'vitest'
import { IFlatNode } from '../models/tree/IFlatNode'
import { IFlatTree } from '../models/tree/IFlatTree'
import { INode } from '../models/tree/INode'
import { TreeNode } from '../models/TreeNode'
import { sortTree } from './tree'

const tree1: TreeNode[] = [

]

describe('tree', () => {

    it('empty', () => {
        const nodes: INode[] = [
            { s: 0, id: "1", },
            { s: 1, id: "2", },
            { s: 2, id: "3", },
            { s: 3, id: "4", },
            { s: 4, id: "5", pid: "1", },
            { s: 5, id: "6", pid: "2", },
            { s: 6, id: "7", pid: "3", },
            { s: 7, id: "8", pid: "4", },
            { s: 8, id: "9", pid: "7", },
            { s: 9, id: "10", pid: "7", },
            { s: 10, id: "11", pid: "6", },
            { s: 11, id: "12", pid: "6", },
        ];

        const expected: IFlatNode[] = [
            { id: '1', l: 0, pid: undefined, s: 0 },
            { id: '2', l: 0, pid: undefined, s: 1 },
            { id: '6', l: 1, pid: '2', s: 5 },
            { id: '11', l: 2, pid: '6', s: 10 },
            { id: '12', l: 2, pid: '6', s: 11 },
            { id: '3', l: 0, pid: undefined, s: 2 },
            { id: '7', l: 1, pid: '3', s: 6 },
            { id: '9', l: 2, pid: '7', s: 8 },
            { id: '10', l: 2, pid: '7', s: 9 },
            { id: '4', l: 0, pid: undefined, s: 3 }
        ]

        for (let i = 0; i < 10; i++) {
            const unsorted: IFlatTree = {
                nodes: _.shuffle(nodes),
                expanded: _.shuffle(["2", "3", "5", "6", "7", "8",]),
            }
            const sorted = sortTree(unsorted);
            console.log(sorted);
            // expect(true).toEqual(true)
            expect(sorted).toEqual(expected)
        }
    })

    it('bar', () => {
        assert.equal(Math.sqrt(4), 2)
    })

    it('snapshot', () => {
        expect({ foo: 'bar' }).toMatchSnapshot()
    })
})