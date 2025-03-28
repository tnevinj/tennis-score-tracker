
const set_check = (set) => {
    var set_status = [false, false]
    if (set[0]>6 || (set[0]>5 && set[1]<5)) {
        set_status[0] = true
    }
    if (set[1]>6 || (set[1]>5 && set[0]<5)) {
        set_status[1] = true
    }
    return set_status
}
const supertie_check = (score) => {
    var set_status = [false, false]
    if (score[0]>9 && (score[0]-score[1])>1) {
        set_status[0] = true
    }
    if (score[1]>9 && (score[1]-score[0])>1) {
        set_status[1] = true
    }
    return set_status
}

const tiebreak_check = (set) => {
    if (set[0] === 6 && set[1] === 6) {
        return true
    } else {
        return false
    }
}

const set_count = (sets) => {
    var sets_completed = sets.filter(checkPositive)
    function checkPositive(e) {
        return e === true
    }
    return 1 + sets_completed.length
}

const sets_status = (set1, set2, set3, supertiebreak) => {
    var sets = []
    return sets.concat(set_check(set1), set_check(set2), set_check(set3), supertie_check(supertiebreak))
}

export const addPoint1 = (match) => {
    match.status = 'in-progress'
    var match_status = sets_status(match.set1, match.set2, match.set3, match.supertiebreak)
    var current_set = set_count(match_status)
    
    // End if match complete (Player1 won two sets)
    if (match_status[0] && match_status[2]) {
        match.status = 'completed'
        return match
    }

    // Supertiebreak third set
    if (current_set === 3 && (match.matchFormat !== 'best-of-3')) {
        match.supertiebreak[0] = match.supertiebreak[0] +1
    }
    
    // Set 1
    if (current_set === 1) {
        var isTiebreak = tiebreak_check(match.set1)
        if (isTiebreak) {
            match.tiebreak1[0] = match.tiebreak1[0] + 1
            if (match.tiebreak1[0] > 6 && (match.tiebreak1[0]-match.tiebreak1[1]) > 1) {
                match.set1[0] = match.set1[0] + 1
            }
        } else {
            match.game[0] = match.game[0] + 1
            if (match.game[0] > 3 && (match.game[0]-match.game[1]) > 1) {
                match.game = [0, 0]
                match.set1[0] = match.set1[0] + 1
            }
            if (match.game[0] === 4 && match.game[1] === 4) {
                match.game = [3, 3]
            }
            if (match.game[0] > 3 && match.matchFormat === 'short-deuce') {
                match.game = [0, 0]
                match.set1[0] = match.set1[0] + 1
            }
        }
    }
    
    // Set2
    if (current_set === 2) {
        var isTiebreak = tiebreak_check(match.set2)
        if (isTiebreak) {
            match.tiebreak2[0] = match.tiebreak2[0] + 1
            if (match.tiebreak2[0] > 6 && (match.tiebreak2[0]-match.tiebreak2[1]) > 1) {
                match.set2[0] = match.set2[0] + 1
            }
        } else {
            match.game[0] = match.game[0] + 1
            if (match.game[0] > 3 && (match.game[0]-match.game[1]) > 1) {
                match.game = [0, 0]
                match.set2[0] = match.set2[0] + 1
            }
            if (match.game[0] === 4 && match.game[1] === 4) {
                match.game = [3, 3]
            }
            if (match.game[0] > 3 && match.matchFormat === 'short-deuce') {
                match.game = [0, 0]
                match.set2[0] = match.set2[0] + 1
            }
        }
    }
    
    // Set3
    if (current_set === 3 && match.matchFormat === 'best-of-3') {
        var isTiebreak = tiebreak_check(match.set3)
        if (isTiebreak) {
            match.tiebreak3[0] = match.tiebreak3[0] + 1
            if (match.tiebreak3[0] > 6 && (match.tiebreak3[0]-match.tiebreak3[1]) > 1) {
                match.set3[0] = match.set3[0] + 1
            }
        } else {
            match.game[0] = match.game[0] + 1
            if (match.game[0] > 3 && (match.game[0]-match.game[1]) > 1) {
                match.game = [0, 0]
                match.set3[0] = match.set3[0] + 1
            }
            if (match.game[0] === 4 && match.game[1] === 4) {
                match.game = [3, 3]
            }
            if (match.game[0] > 3 && match.matchFormat === 'short-deuce') {
                match.game = [0, 0]
                match.set3[0] = match.set3[0] + 1
            }
        }
    }

    match_status = sets_status(match.set1, match.set2, match.set3, match.supertiebreak)
    current_set = set_count(match_status)
    if (match_status[0] && match_status[2]) {
        match.status = 'completed'
        return match
    }
    if (current_set>3) {
        match.status = 'completed'
        return match
    }
    return match
}

export const addPoint2 = (match) => {
    match.status = 'in-progress'
    var match_status = sets_status(match.set1, match.set2, match.set3, match.supertiebreak)
    var current_set = set_count(match_status)
    
    // End if match complete (Player2 won two sets)
    if (match_status[1] && match_status[3]) {
        match.status = 'completed'
        return match
    }

    // Supertiebreak third set
    if (current_set === 3 && (match.matchFormat !== 'best-of-3')) {
        match.supertiebreak[1] = match.supertiebreak[1] +1
    }
    
    // Set 1
    if (current_set === 1) {
        var isTiebreak = tiebreak_check(match.set1)
        if (isTiebreak) {
            match.tiebreak1[1] = match.tiebreak1[1] + 1
            if (match.tiebreak1[1] > 6 && (match.tiebreak1[1]-match.tiebreak1[0]) > 1) {
                match.set1[1] = match.set1[1] + 1
            }
        } else {
            match.game[1] = match.game[1] + 1
            if (match.game[1] > 3 && (match.game[1]-match.game[0]) > 1) {
                match.game = [0, 0]
                match.set1[1] = match.set1[1] + 1
            }
            if (match.game[0] === 4 && match.game[1] === 4) {
                match.game = [3, 3]
            }
            if (match.game[1] > 3 && match.matchFormat === 'short-deuce') {
                match.game = [0, 0]
                match.set1[1] = match.set1[1] + 1
            }
        }
    }
    
    // Set2
    if (current_set === 2) {
        var isTiebreak = tiebreak_check(match.set2)
        if (isTiebreak) {
            match.tiebreak2[1] = match.tiebreak2[1] + 1
            if (match.tiebreak2[1] > 6 && (match.tiebreak2[1]-match.tiebreak2[0]) > 1) {
                match.set2[1] = match.set2[1] + 1
            }
        } else {
            match.game[1] = match.game[1] + 1
            if (match.game[1] > 3 && (match.game[1]-match.game[0]) > 1) {
                match.game = [0, 0]
                match.set2[1] = match.set2[1] + 1
            }
            if (match.game[0] === 4 && match.game[1] === 4) {
                match.game = [3, 3]
            }
            if (match.game[1] > 3 && match.matchFormat === 'short-deuce') {
                match.game = [0, 0]
                match.set2[1] = match.set2[1] + 1
            }
        }
    }
    
    // Set3
    if (current_set === 3 && match.matchFormat === 'best-of-3') {
        var isTiebreak = tiebreak_check(match.set3)
        if (isTiebreak) {
            match.tiebreak3[1] = match.tiebreak3[1] + 1
            if (match.tiebreak3[1] > 6 && (match.tiebreak3[1]-match.tiebreak3[0]) > 1) {
                match.set3[1] = match.set3[1] + 1
            }
        } else {
            match.game[1] = match.game[1] + 1
            if (match.game[1] > 3 && (match.game[1]-match.game[0]) > 1) {
                match.game = [0, 0]
                match.set3[1] = match.set3[1] + 1
            }
            if (match.game[0] === 4 && match.game[1] === 4) {
                match.game = [3, 3]
            }
            if (match.game[1] > 3 && match.matchFormat === 'short-deuce') {
                match.game = [0, 0]
                match.set3[1] = match.set3[1] + 1
            }
        }
    }

    match_status = sets_status(match.set1, match.set2, match.set3, match.supertiebreak)
    current_set = set_count(match_status)
    if (match_status[1] && match_status[3]) {
        match.status = 'completed'
        return match
    }
    if (current_set>3) {
        match.status = 'completed'
        return match
    }
    return match
}