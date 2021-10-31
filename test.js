class Node{
    data;
    next;
    constructor( data ){
        this.data = data;
        this.next = null;
    }
}

class LinkedList{
    head;
    consturctor(){
        head = null;
    }
}

function printList(head){
    var curr = head;

    var ans = "";

    while( curr ){
        ans += curr.data + " ";
        curr = curr.next;
    }
    console.log( ans );
}

function reverseList( head, a ){
    var curr = head;
    var curr1 = curr;  //-----( 1 )
    var pre = null;
    var next = null;

    var x = a;
    while( curr && x > 0){
        next = curr.next;
        curr.next = pre;

        pre = curr;
        curr = next;
        x--;
    }

    if( curr != null ){
        curr1.next = reverseList( next, a ); //-----{ 2 }
    }
    return pre;

}

function main(){
    var node = new Node( 5 );
    // var list = new LinkedList();
    // list.head = node;
    var head = node;

    for( var i = 10; i < 18; i++ ){
        var node1 = new Node( i );
        node.next = node1;
        node = node1;
    }

    var newHead = reverseList( head, 3 );

    console.log( "New Print List = ", newHead );
    printList(  newHead );

}

main();