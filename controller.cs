using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using SocketIO;


public class controller : MonoBehaviour {
	
	private GameObject player;
	string gamedata="";
	void Start () {
		GameObject go = GameObject.Find("SocketIO");
		player = GameObject.Find ("player");
		SocketIOComponent socket= go.GetComponent<SocketIOComponent>();
		socket.On ("datarec",(SocketIOEvent obj) => {
			//Debug.Log(obj.data);
			Debug.Log(obj.data.ToString().Substring(9,3));
			gamedata=obj.data.ToString().Substring(9,3);
			player.transform.Rotate (0,float.Parse(gamedata), 0);
		});
	}

	// Update is called once per frame
	void Update () {
		
	}
	void OnGUI() {
		if (GUI.Button (new Rect (10, 70, 50, 30), "Click")) {
			Debug.Log ("Clicked the button with text");
			GameObject go = GameObject.Find("SocketIO");
			SocketIOComponent socket= go.GetComponent<SocketIOComponent>();
			//socket.Emit ("disconnect");
		}

	}

}
