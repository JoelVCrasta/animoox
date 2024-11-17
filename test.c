def merge(D1, D2, priority):
    # Create a new dictionary with all key-value pairs from D1
    D = D1.copy()
    
    # For each key-value pair in D2
    for key, value in D2.items():
        # If key not in D1, add it from D2
        if key not in D1:
            D[key] = value
        # If key in both D1 and D2, use priority to decide
        elif priority == "second":
            D[key] = value
        # If priority is "first", keep D1's value which is already in D
            
    return D
