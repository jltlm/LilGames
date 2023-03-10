var Queue = function () {
    this.first = null;
    this.size = 0;
};

var Node = function (data) {
    this.data = data;
    this.next = null;
};

Queue.prototype.enqueue = function (data) {
    var node = new Node(data);

    if (!this.first) {
        this.first = node;
    } else {
        let n = this.first;
        while (n.next) {
            n = n.next;
        }
        n.next = node;
    }

    this.size += 1;
    return node;
};

Queue.prototype.dequeue = function () {
    let temp = this.first;
    this.first = this.first.next;
    this.size -= 1;
    return temp;
};

//   https://stackoverflow.com/a/23573210/6622395